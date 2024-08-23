from api.openaii import OpenAI
from langchain_community.vectorstores import TiDBVectorStore
from langchain_huggingface import HuggingFaceEmbeddings
from fpdf import FPDF
import time
from io import BytesIO
import os
from dotenv import load_dotenv

load_dotenv()
tidb_key = os.getenv('TIDB_DATABASE_URL')

model_name = 'avsolatorio/GIST-Embedding-v0'
embeddings = HuggingFaceEmbeddings(model_name=model_name)

TABLE_NAME = "embedding"
db = TiDBVectorStore(
    embedding_function=embeddings,
    table_name=TABLE_NAME,
    connection_string=tidb_key,
    distance_strategy="cosine"
)


def get_openai_client(start_date, end_date, key):

    negative_query = "dislike, hate, disappointed, bad, poor, worst, terrible, regret, awful"
    # positive_query = "like, love, satisfied, good, great, best, excellent, happy, amazing"
    # negative_query = "negative"
    # positive_query = "positive"
    start_vector_search = time.time()
    docs_on_negative = db.similarity_search_with_score(negative_query, filter={"$and": [{"Date": {"$gte": {start_date}}}, {"Date": {"$lte": {end_date}}}]}, k=30)
    # docs_on_positive = db.similarity_search_with_score(positive_query, filter={"$and": [{"Date": {"$gte": {start_date}}}, {"Date": {"$lte": {end_date}}}]}, k=25)
    end_vector_search = time.time()
    print(f"Vector search took {end_vector_search - start_vector_search:.2f} seconds")

    filtered_neg_docs = [
        (doc, score) for doc, score in docs_on_negative
        if len(doc.page_content) > 20
    ]
    filtered_neg_docs = sorted(filtered_neg_docs, key=lambda x: x[1], reverse=True)
    # filtered_pos_docs = [
        # (doc, score) for doc, score in docs_on_positive
        # if len(doc.page_content) > 20
    # ]
    # filtered_pos_docs = sorted(filtered_pos_docs, key=lambda x: x[1], reverse=True)

    print("Filtered Negative Documents:")
    print(filtered_neg_docs)
    # print("Filtered Positive Documents:")
    # print(filtered_pos_docs)

    Ndoc = ""
    # Pdoc = ""
    for document, score in filtered_neg_docs:
        Ndoc +=  "\n -" + document.page_content 
    # for document, score in filtered_pos_docs:
        # Pdoc +=  "\n -" + document.page_content 
    mainmodel = 'gpt-3.5-turbo-instruct'
    modelquery = f"Make a detailed points and explain(minimum 500 words, maximum 800 words) what the customer disliked about the product from the below context:\n\nNegative Feedback: {Ndoc}\n\nresponse should be in HTML tags"

    start_model_generation = time.time()
    response_text = ""
    # stream = ollama.generate(model=mainmodel, prompt=modelquery,stream=True)
    # for chunk in stream:
    #     if chunk["response"]:
    #         # print(chunk['response'], end='', flush=True)
    #         response_text += chunk['response']
    #         # yield chunk['response']
    client = OpenAI(api_key=key)
    completion = client.chat.completions.create(
        model=mainmodel,
        messages=[
            {
                "role": "user",
                "content": modelquery,
            },
        ],
    )
    response_text=completion.choices[0].message.content
    end_model_generation = time.time()
    print(f"\nAI model generation took {end_model_generation - start_model_generation:.2f} seconds")

    # with open("feedback.txt", "w", encoding="utf-8") as txt_file:
    #     txt_file.write(response_text)

    pdf = FPDF()
    pdf.add_page()
    pdf.add_font("DejaVu", fname="dejavu-fonts-ttf-2.37/ttf/DejaVuSans.ttf")
    pdf.add_font("DejaVu", style="I", fname="dejavu-fonts-ttf-2.37/ttf/DejaVuSans-Oblique.ttf")
    pdf.add_font("DejaVu", style="B", fname="dejavu-fonts-ttf-2.37/ttf/DejaVuSans-Bold.ttf")
    pdf.add_font("DejaVu", style="BI", fname="dejavu-fonts-ttf-2.37/ttf/DejaVuSans-BoldOblique.ttf")
    pdf.set_font("DejaVu", size=14)
    pdf.write_html(response_text)
    # pdf_filename = "feedback.pdf"
    # pdf.output(pdf_filename)
    pdf_io = BytesIO()
    pdf.output(pdf_io)
    pdf_io.seek(0)

    return pdf_io


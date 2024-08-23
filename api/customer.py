from langchain_community.vectorstores import TiDBVectorStore
from langchain.schema import Document
from langchain_huggingface import HuggingFaceEmbeddings
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()
tidb_key = os.getenv('TIDB_DATABASE_URL')

def Customer_fit(json_data):
    # Load the embedding model
    model_name = 'avsolatorio/GIST-Embedding-v0'
    embeddings = HuggingFaceEmbeddings(model_name=model_name)
    # Initialize TiDBVectorStore with connection details
    TABLE_NAME = "embedding"
    # Convert JSON data to a Document object
    current_date = datetime.now().strftime('%Y-%m-%d')
    current_date_number = int(current_date.replace('-', ''))
    # document = Document(page_content=json_data['bio'], metadata={"Date": json_data['Date']})
    document = Document(page_content=json_data['bio'], metadata={"Date": current_date_number})
    # Store the Document object in the vector database
    db = TiDBVectorStore.from_documents(
        documents=[document],  # Storing the single document
        embedding=embeddings,  # Use the embedding model
        table_name=TABLE_NAME,
        connection_string=tidb_key,
        distance_strategy="cosine"  # Use cosine similarity for vector search
    )

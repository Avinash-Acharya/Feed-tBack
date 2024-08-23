from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch

# Load the model and tokenizer
model = AutoModelForSequenceClassification.from_pretrained('../../models/1')
tokenizer = AutoTokenizer.from_pretrained('../../models/1')

def predict(data):
    text = data['text']
    # Tokenize and make prediction
    inputs = tokenizer(text, return_tensors='pt')
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
    prediction = logits.argmax().item()
    message = "Not a Hate-Speech" if prediction == 0 else "Is a Hate-Speech"
    # return jsonify({'prediction': message})
    return message


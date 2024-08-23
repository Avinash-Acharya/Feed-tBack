from flask import Flask, jsonify, request, Response, send_file
from customer import Customer_fit
from predictHate import predict
from retrieval import generate_feedback
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Ooga Boga"

@app.route('/api/customer', methods=['POST'])
def get_data():
    data = request.json
    Customer_fit(data)
    return jsonify({"received": data}), 201

@app.route('/api/admin/generate_feedback', methods=['POST'])
def get_response():
    data = request.json
    start_date = data.get('from')
    end_date = data.get('to')
    filename = f"feedback_{start_date}_{end_date}.pdf"
    pdf_filename = generate_feedback(start_date, end_date)
    return send_file(pdf_filename, mimetype='application/pdf', as_attachment=True, download_name=filename)

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.json
    res = predict(data)
    return jsonify({'prediction': res})

if __name__ == '__main__':
    app.run()

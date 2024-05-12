from flask import Flask, request, jsonify
from flask_cors import CORS
from keybert import KeyBERT
import logging

# Setting up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app, resources={r"/extract_keyphrases": {"origins": "*"}})

# Initialize KeyBERT model
keybert_model = KeyBERT()

def capitalize_first_letter(text):
    return ' '.join(word.capitalize() for word in text.split())

@app.route('/extract_keyphrases', methods=['POST'])
def extract_keyphrases():
    logger.info("Received POST request to /extract_keyphrases")
    if request.method == 'POST':
        try:
            data = request.get_json()
            if 'text' in data:
                text = data['text']
                logger.info("Text to extract keyphrases from: %s", text)
                # Extract keyphrases using KeyBERT
                keyphrases_with_scores = keybert_model.extract_keywords(text)
                # Remove scores from keyphrases and capitalize first letter
                keyphrases = [capitalize_first_letter(phrase) for phrase, score in keyphrases_with_scores]
                logger.info("Keyphrases extracted: %s", keyphrases)
                return jsonify({"keyphrases": keyphrases})
            else:
                logger.error("Text input is missing in request.")
                return jsonify({"error": "Text input is missing"}), 400
        except Exception as e:
            logger.error("An error occurred: %s", e)
            return jsonify({"error": str(e)}), 500
    else:
        logger.error("Method not allowed.")
        return jsonify({"error": "Method not allowed"}), 405

if __name__ == '__main__':
    app.run(debug=True)

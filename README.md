# {Feed!tBack}

An AI based feedback collection and management system for Growing Businesses

![Process-Flow/Architecture Diagram](TiDB_FeedItBack.jpg)

## Getting Started

### Local Development

Note: The following steps are valid for only Windows OS

Prerequisites:

- `npm`
- `pip`
- `ollama`

Start with Cloning the repository

```bash
git clone https://github.com/Avinash-Acharya/FeeditBack.git
```

Navigate to the Root folder and install the necessary node packages

```bash
npm i
```

Now navigate to the /api folder and create an virtual environment and activate it

```bash
cd api
python -m venv myenv
myenv/Scripts/activate
```

Install the necessary Python Libraries

```bash
pip install -r requirements.txt
```

Create a `.env` file in the Root folder and add a field `TIDB_DATABASE_URL` and enter the TiDB Connection String which looks like `mysql+pymysql://{TIDB_USER}:{TIDB_PASSWORD}@{TIDB_HOST}:{TIDB_PORT}/{TIDB_DB_NAME}?ssl_verify_cert=True&ssl_verify_identity=True`

We will use ollama to run LLM models locally, So Install Ollama from [here](https://ollama.com/) and run the below command

```bash
ollama pull phi3:3.8b-mini-128k-instruct-q4_K_M
```

Then run this Command in the Root folder

```bash
npm run dev
```

And finall run this Command in the /api folder

```bash
cd api
python app.py
```

Now we got both Nextjs and Flask running on port [http://localhost:3000](http://localhost:3000) and [http://127.0.0.1:5000](http://127.0.0.1:5000) respectively.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

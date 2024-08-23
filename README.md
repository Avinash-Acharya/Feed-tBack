# {Feed!tBack}

A feedback collection and management system for Growing Businesses

## Getting Started

### Local Development

Start with Cloning the repository

```bash
git clone https://github.com/Avinash-Acharya/Feed-tBack.git
```

Create a `.env` file in the root folder and add a field `TIDB_DATABASE_URL` and enter the TiDB Connection Link

Run this command in the root folder

```bash
npm run dev
```

Run this command in the /api folder

```bash
cd api
python app.py
```

Now we got both Nextjs and Flask running on port [http://localhost:3000](http://localhost:3000) and [http://127.0.0.1:5000](http://127.0.0.1:5000) respectively.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

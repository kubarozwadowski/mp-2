# Free Stack Index

A React and TypeScript catalog that displays free developer-tool offers from
the [AgentDeals API](https://agentdeals.dev/api/docs).

## Run locally

```bash
npm install
npm run dev
```

`App.tsx` fetches the API data with React hooks. The `Deals` component receives
that data through props and renders the interface with styled-components.

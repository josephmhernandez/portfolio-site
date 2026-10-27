# Joseph Hernandez Portfolio

Public portfolio covering production backend and distributed-systems experience, three interactive engineering demos, and selected earlier machine-learning work.

![Portfolio project showcase](docs/portfolio.png)

## Live site

<https://josephmhernandez.com>

## Architecture

- Amazon S3 private origin
- Amazon CloudFront with Origin Access Control
- ACM-managed TLS certificate
- Route 53 apex and `www` aliases
- CloudFormation-managed infrastructure

All demos share one static distribution. Easerva uses a stateful WebSocket application on ECS Fargate. Candidate Analyzer uses a throttled Lambda API and Gemini. Map Studio uses an HTTP API, SQS, DynamoDB, one-off Fargate render tasks, and private S3 PNG output. Services are concurrency-limited to control cost.

## Deploy

```bash
aws cloudformation deploy \
  --stack-name jmh-portfolio-hosting \
  --template-file infrastructure/hosting.yaml
```

Upload the root site, then invalidate CloudFront after the demo builds have been copied into `demos/`.

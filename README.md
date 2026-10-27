# Joseph Hernandez Portfolio

Public portfolio and index for three interactive engineering demos.

## Live site

<https://josephmhernandez.com>

## Architecture

- Amazon S3 private origin
- Amazon CloudFront with Origin Access Control
- ACM-managed TLS certificate
- Route 53 apex and `www` aliases
- CloudFormation-managed infrastructure

All demos share one static distribution to keep idle infrastructure cost close to zero. The Easerva demo additionally uses an API Gateway WebSocket API and Lambda.

## Deploy

```bash
aws cloudformation deploy \
  --stack-name jmh-portfolio-hosting \
  --template-file infrastructure/hosting.yaml
```

Upload the root site, then invalidate CloudFront after the demo builds have been copied into `demos/`.


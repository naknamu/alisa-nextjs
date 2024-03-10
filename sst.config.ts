import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";

export default {
  config(_input) {
    return {
      name: "alisa-nextjs",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const certArn = process.env.certArn
      const site = new NextjsSite(stack, "site", {
        customDomain: {
          isExternalDomain: true,
          domainName: "www.alisa.pics",
          cdk: {
            certificate: Certificate.fromCertificateArn(stack, "MyCert", certArn),
          },
        },
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;

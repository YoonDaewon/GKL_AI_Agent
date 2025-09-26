/* eslint-disable unicorn/prefer-node-protocol */
const AWS = require("aws-sdk");
const fs = require("fs");
const package_ = require("../package.json");

const prefix = `${package_.name}/${package_.version}`;
/*
const appFile = fs
  .readdirSync(`./../${prefix}`)
  .find((e) => e.endsWith('.html'));

if (!appFile) {
  console.error('Required build before purge.'); // eslint-disable-line no-console
  process.exit(1);
}
*/

//const credentials = new AWS.SharedIniFileCredentials();
//AWS.config.credentials = credentials;

const cfResId = process.env.FE_DEPLOY_CFID;

if (!cfResId) {
  throw new Error("Missing `CFID` environment variable.");
}

const cf = new AWS.CloudFront();

cf.getDistribution({ Id: cfResId }, (error, data) => {
  if (error || !data || !data.DistributionConfig) {
    console.error(error); // eslint-disable-line no-console
    process.exit(1);
  }

  const eTag = data.ETag;
  //const defaultRootObject = `${prefix}/${appFile}`;
  const distributionConfig = data.DistributionConfig;

  //distributionConfig.DefaultRootObject = defaultRootObject;
  distributionConfig.Origins.Items[0].OriginPath = `/${package_.name}/${package_.version}`;
  distributionConfig.CustomErrorResponses.Items.map((e) => {
    e.ResponsePagePath = `/index.html`;
    return e;
  });

  const updateParameters = {
    DistributionConfig: distributionConfig,
    Id: cfResId,
    IfMatch: eTag,
  };

  cf.updateDistribution(updateParameters, (error, data) => {
    if (error) {
      console.error(error); // eslint-disable-line no-console
      process.exit(1);
    }

    const invalidateParameters = {
      DistributionId: cfResId,
      InvalidationBatch: {
        /* required */
        CallerReference: `Purge - ${new Date().toString()}` /* required */,
        Paths: {
          /* required */ Quantity: 1 /* required */,
          Items: ["/*"],
        },
      },
    };

    cf.createInvalidation(invalidateParameters, (error, data) => {
      if (error) {
        console.error(error); // eslint-disable-line no-console
        process.exit(1);
      }

      process.exit(0);
    });
  });
});

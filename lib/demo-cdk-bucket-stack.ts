import * as cdk from '@aws-cdk/core';
// import Bucket
import { Bucket } from '@aws-cdk/aws-s3';
// import CfnOutput, CfnParameter, Duration
import { CfnOutput, CfnParameter, Duration } from '@aws-cdk/core';


export class DemoCdkBucketStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a new bucket as someBucket with lifecycle expiration in 1 day
    const someBucket = new Bucket(this, 'someBucket', {
      lifecycleRules: [
        {
          expiration: Duration.days(1),
          enabled: true,
        },
      ],
    });

    // Create a new CfnOutput with someBucket's bucket name
    new CfnOutput(this, 'someBucketName', {
      value: someBucket.bucketName,
    });

  }
}

import * as cdk from '@aws-cdk/core';
// import Bucket
import { Bucket } from '@aws-cdk/aws-s3';
// import CfnOutput, CfnParameter, Duration
import { CfnOutput, CfnParameter, Duration } from '@aws-cdk/core';


export class DemoCdkBucketStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    /**
     * new CfnParameter as duration
     * @summary is a number, defaul =6 hours
     */
    const duration = new CfnParameter(this, 'duration', {
      type: 'Number',
      default: 6,
      minValue: 1,
      maxValue: 24,
    });

    // Create a new bucket as someBucket with lifecycle expiration in 1 day
    const someBucket = new Bucket(this, 'someBucket', {
      lifecycleRules: [
        {
          expiration: Duration.days(duration.valueAsNumber),
        },
      ],
    });

    // Create a new CfnOutput with someBucket's bucket name
    new CfnOutput(this, 'someBucketName', {
      value: someBucket.bucketName,
    });

  }
}

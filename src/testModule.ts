import * as confconfig from "./confluent-properties.json"
import produceExample from "./producer"

export default function createMsg(msg: string): void {
  console.log(msg)
  const omsg = JSON.parse(msg)
  console.log(omsg)
  // produceExample()
  //   .catch((err) => {
  //     console.error(`Something went wrong:\n${err}`);
  //     //process.exit(1);
  //   });
}

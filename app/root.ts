import { Config, drivers } from "../glase/src";

export default Config({
  ODM: {
    driver: drivers.MongoDB()
  }
});
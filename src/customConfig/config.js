export function getConfigData() {
  let corsTargetProduction = 'https://api2.liangzishangcheng.com';
  let dingIdProduction = 'dingoa3kzop2vjeazklrmc';
  if (window.appInitCustom != null) {
    if (window.appInitCustom.apiPrefix != null) {
      if (window.appInitCustom.apiPrefix.corsTargetProduction != null) {
        const {
          apiPrefix: { corsTargetProduction: corsTargetProductionRemote },
        } = window.appInitCustom;

        corsTargetProduction = corsTargetProductionRemote;
      }
    }
  }
  return {
    corsTargetDevelopment: 'http://api2.dev.liangzishangcheng.com',
    dingIdDevelopment: 'dingoaqwztws521zesnzsw',
    corsTargetProduction,
    dingIdProduction,
  };
}


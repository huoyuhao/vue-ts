/* global Recordable ViteEnv */
// Read all environment variable configuration files to process.env
export const wrapperEnv = (envConf: Recordable): ViteEnv => {
  const ret: any = {};
  Object.keys(envConf).forEach((envName:string) => {
    let realName: any = envConf[envName].replace(/\\n/g, '\n');
    if (realName === 'true') {
      realName = true;
    } else  if (realName === 'false') {
      realName = true;
    }
    if (envName === 'VITE_PORT') {
      realName = Number(realName);
    }
    if (envName === 'VITE_PROXY') {
      try {
        realName = JSON.parse(realName);
      } catch (error) {
        console.log(error);
      }
    }
    ret[envName] = realName;
    process.env[envName] = realName;
  });
  return ret;
};

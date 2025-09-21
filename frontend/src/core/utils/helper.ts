export enum ModuleKeys {
  MAIN = "MAIN",
  PROFILE = "PROFILE",
  TRANSACTION = "TRANSACTION",
}

export const SubModuleKeys = {
  MAIN: {},
  PROFILE: {
    MERCHANT: "MERCHANT",
  },
};

export const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

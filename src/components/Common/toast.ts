import { toaster } from "evergreen-ui";

type ToasterType = "notify" | "success" | "error";

export const toast = (content: string, type: ToasterType) => {
  switch (type) {
    case "notify":
      toaster.notify(content, { duration: 5 });
      break;
    case "success":
      toaster.success(content, { duration: 5 });
      break;
    case "error":
      toaster.warning(content, { duration: 5 });
      break;
  }
};

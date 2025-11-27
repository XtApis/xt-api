import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "petstore/simple-petstore-api",
    },
    {
      type: "category",
      label: "pets",
      items: [
        {
          type: "doc",
          id: "petstore/list-pets",
          label: "List all pets",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "petstore/create-pet",
          label: "Create a pet",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "petstore/show-pet-by-id",
          label: "Info for a specific pet",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;

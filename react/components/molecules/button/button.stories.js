import React from "react";
import { storiesOf } from "@storybook/react-native";

import { Button } from "./button";

storiesOf("Molecules", module)
  .add("Button", () => (
    <Button></Button>
  ));

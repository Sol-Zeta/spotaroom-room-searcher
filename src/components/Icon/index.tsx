import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface Props {
  icon: IconProp;
}

export const Icon = ({ icon }: Props) => (
  <div>
    <FontAwesomeIcon icon={icon} />
  </div>
);

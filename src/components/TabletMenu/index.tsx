import React, { useState, Fragment } from "react";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Icon } from "../Icon";
import { icons } from "../../assetsRoutes";
import { IRoutesOptions } from "../../types";
import { capitalizeWords } from "../../utils";

interface Props {
  routes: IRoutesOptions[];
}

export const TabletMenu = ({ routes }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const { t } = useTranslation();

  const toggleDrawer = () => setIsOpen(!isOpen);

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="menu"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        {routes.map((e: IRoutesOptions, i: number) => (
          <Fragment key={i}>
            <ListItem>
              <Link href={e.url} passHref>
                <ListItemText
                  primary={capitalizeWords(t(`common:${e.title}`))}
                />
              </Link>
            </ListItem>
            <Divider />
          </Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Fragment key={1}>
        <Button onClick={toggleDrawer}>
          <Icon icon={icons.burger} big/>
        </Button>
        <Drawer anchor={"right"} open={isOpen} onClose={toggleDrawer}>
          {list()}
        </Drawer>
      </Fragment>
    </div>
  );
};

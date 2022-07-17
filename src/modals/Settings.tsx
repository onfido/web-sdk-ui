import { Modal, Tabs } from "@mantine/core";
import React from "react";
import { Photo } from "tabler-icons-react";
import { Label } from "../components/Menu/Label";


export default (props) => (
  <Modal
    opened={props.opened}
    onClose={props.onClose}
    title="Settings"
    centered
    // overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
    overlayOpacity={0.55}
    overlayBlur={3}
    overflow="inside"
  >
    <Tabs>
      <Tabs.Tab label="Basic" icon={<Photo size={14} />}>
        <Label
          title="Version"
          description="We provide normal, patch, LTS & Quater releases to help you get the best version"
          type="input"
        />
        <Label
          title="Environment"
          description="We provide normal, patch, LTS & Quater releases to help you get the best version"
          type="input"
        />
        <Label
          title="Language"
          description="We provide normal, patch, LTS & Quater releases to help you get the best version"
          type="input"
        />
        <Label
          title="Version"
          description="We provide normal, patch, LTS & Quater releases to help you get the best version"
          type="input"
        />
        <Label
          title="Environment"
          description="We provide normal, patch, LTS & Quater releases to help you get the best version"
          type="input"
        />
        <Label
          title="Language"
          description="We provide normal, patch, LTS & Quater releases to help you get the best version"
          type="input"
        />
      </Tabs.Tab>
      <Tabs.Tab label="Orchestartion" icon={<Photo size={14} />}>
        <Label
          title="Version"
          description="We provide normal, patch, LTS & Quater releases to help you get the best version"
          type="input"
        />
        <Label
          title="Environment"
          description="We provide normal, patch, LTS & Quater releases to help you get the best version"
          type="input"
        />
        <Label
          title="Language"
          description="We provide normal, patch, LTS & Quater releases to help you get the best version"
          type="input"
        />
        <Label
          title="Version"
          description="We provide normal, patch, LTS & Quater releases to help you get the best version"
          type="input"
        />
        <Label
          title="Environment"
          description="We provide normal, patch, LTS & Quater releases to help you get the best version"
          type="input"
        />
        <Label
          title="Language"
          description="We provide normal, patch, LTS & Quater releases to help you get the best version"
          type="input"
        />
      </Tabs.Tab>
    </Tabs>
  </Modal>
)

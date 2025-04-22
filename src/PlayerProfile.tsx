import { ComponentProps, FC, ReactNode } from "react";
import { Drawer } from "vaul";
import { GamePlayer } from "./types";
import { BoxPlayer } from "./BoxPlayer";

type PlayerProfileProps = {
  children?: ReactNode | undefined;
  player?: GamePlayer;
} & Partial<ComponentProps<(typeof Drawer)["Root"]>>;

export const PlayerProfile: FC<PlayerProfileProps> = (props) => {
  const { open, onOpenChange, player } = props;
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Title>Player Stats</Drawer.Title>
        <Drawer.Description>Player Stats</Drawer.Description>
        <Drawer.Overlay className="drawer-overlay" />
        <Drawer.Content className="drawer-content">
          <Drawer.Handle className="drawer-handle" />
          <div className="drawer-children">
            {player && <BoxPlayer player={player} />}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

import { Reorder, useDragControls } from 'framer-motion';
import { GripIcon } from 'lucide-react';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ListItem } from '@/utils';

interface Props {
  item: ListItem;
  position: number;
}

export default function AlbumCard({ item, position }: Props) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      dragControls={controls}
      dragListener={false}
      key={item.id}
      value={item}
    >
      <Card className="transition-shadow has-[svg:active]:shadow-lg">
        <CardHeader className="select-none p-4">
          <div className="flex items-start justify-between">
            <CardTitle>
              {position}. {item.title}
            </CardTitle>
            <GripIcon
              className="size-4 shrink-0 hover:cursor-grab active:cursor-grabbing"
              onPointerDown={(event) => controls.start(event)}
            />
          </div>
          <CardDescription>{item.artist}</CardDescription>
        </CardHeader>
      </Card>
    </Reorder.Item>
  );
}

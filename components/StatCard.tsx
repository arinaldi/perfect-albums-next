import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'components/ui/card';
import { Skeleton } from 'components/ui/skeleton';

interface Props {
  isLoading?: boolean;
  title: string;
  value: string;
}

export default function StatCard({ isLoading, title, value }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">
          {isLoading ? <Skeleton className="mt-1 h-8 w-1/2" /> : value}
        </CardTitle>
        <CardDescription>{title}</CardDescription>
      </CardHeader>
    </Card>
  );
}

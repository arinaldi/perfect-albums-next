import { Checkbox } from 'components/ui/checkbox';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import SubmitButton from 'components/SubmitButton';
import { Album } from '@/utils/types';

interface Props {
  action: (formData: FormData) => void;
  data?: Album;
}

export default function AlbumForm({ action, data }: Props) {
  return (
    <form action={action} className="space-y-8">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="artist">Artist</Label>
        <Input
          autoFocus
          defaultValue={data?.artist}
          id="artist"
          name="artist"
          required
        />
        <p className="text-[0.8rem] text-muted-foreground">The album artist</p>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="title">Title</Label>
        <Input defaultValue={data?.title} id="title" name="title" required />
        <p className="text-[0.8rem] text-muted-foreground">The album title</p>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="year">Year</Label>
        <Input
          defaultValue={data?.year ?? new Date().getFullYear().toString()}
          id="year"
          name="year"
          required
          type="number"
        />
        <p className="text-[0.8rem] text-muted-foreground">
          The year the album was released
        </p>
      </div>
      <div className="flex space-x-3 space-y-0">
        <Checkbox defaultChecked={data?.studio} id="studio" name="studio" />
        <div className="space-y-1 leading-none">
          <label htmlFor="studio" className="text-sm font-medium leading-none">
            Studio
          </label>
          <p className="text-[0.8rem] text-muted-foreground">
            Is this a studio album?
          </p>
        </div>
      </div>
      <div className="flex space-x-3 space-y-0">
        <Checkbox defaultChecked={data?.cd} id="cd" name="cd" />
        <div className="space-y-1 leading-none">
          <label htmlFor="cd" className="text-sm font-medium leading-none">
            CD
          </label>
          <p className="text-[0.8rem] text-muted-foreground">
            Do you own this CD?
          </p>
        </div>
      </div>
      <div className="flex space-x-3 space-y-0">
        <Checkbox
          defaultChecked={data?.favorite}
          id="favorite"
          name="favorite"
        />
        <div className="space-y-1 leading-none">
          <label
            htmlFor="favorite"
            className="text-sm font-medium leading-none"
          >
            Favorite
          </label>
          <p className="text-[0.8rem] text-muted-foreground">
            Is this a top album?
          </p>
        </div>
      </div>
      <SubmitButton className="w-full sm:w-auto" />
    </form>
  );
}

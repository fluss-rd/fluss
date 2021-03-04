import { Button, Card, CardActions, CardContent, Typography } from "@material-ui/core";

export default function Another() {
  return (
    <Card>
      <CardContent>
        <Typography color="secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="h2">
          be*nev*o*lent
        </Typography>
        <Typography color="secondary">adjective</Typography>
        <Typography variant="body2" component="p">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore ipsam sequi qui,
          necessitatibus quia voluptate. Quo et ad repudiandae animi natus. Soluta omnis natus
          maiores voluptatem nam voluptas, libero sed!
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

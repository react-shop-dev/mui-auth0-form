import Typography, { TypographyProps } from '@mui/material/Typography';

export interface TitleProps extends TypographyProps {
  title: string;
}

const Title = (props: TitleProps) => {
  const { title, sx, ...rest } = props;

  return (
    <Typography gutterBottom variant="h5" textAlign="center" color="gray" sx={sx} {...rest}>
      {title}
    </Typography>
  );
};

export default Title;

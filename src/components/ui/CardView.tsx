import { ReactNode } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';

const CardView = ({ children }: { children: ReactNode }) => {
  return (
    <Root>
      <Card className={CardViewClasses.card}>
        <CardContent>{children}</CardContent>
      </Card>
    </Root>
  );
};

const PREFIX = 'RsCardView';

export const CardViewClasses = {
  card: `${PREFIX}-card`,
  topBar: `${PREFIX}-topBar`,
  icon: `${PREFIX}-icon`,
  backArrow: `${PREFIX}-backArrow`,
};

const Root = styled('div', { name: PREFIX })({
  [`& .${CardViewClasses.card}`]: {
    minWidth: 400,
    maxWidth: 450,
  },
  [`& .${CardViewClasses.topBar}`]: {
    display: 'grid',
    gridAutoFlow: 'column',
    justifyContent: 'center',
    marginBottom: '1em',
    position: 'relative',
  },
  [`& .${CardViewClasses.backArrow}`]: {
    position: 'absolute',
    left: 0,
  },
});

export default CardView;

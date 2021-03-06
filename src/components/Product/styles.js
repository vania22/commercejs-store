import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
    root: {
        maxWidth: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: 'auto',
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 16,
    },
}));

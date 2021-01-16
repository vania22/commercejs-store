import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    root: {
        maxWidth: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    media: {
        height: 260,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: 'auto',
    },
    buttons: {
        display: 'flex',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
    },
}));

export const auth = () => {
    return { 'x-auth-token': localStorage.getItem('TOKEN') }
}
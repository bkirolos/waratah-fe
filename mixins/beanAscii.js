const beanAscii = ` 
 _______  _______  _______  __    _        ___      _______ 
|  _    ||       ||   _   ||  |  | |      |   |    |   _   |
| |_|   ||    ___||  |_|  ||   |_| |      |   |    |  |_|  |
|       ||   |___ |       ||       |      |   |    |       |
|  _   | |    ___||       ||  _    | ___  |   |___ |       |
| |_|   ||   |___ |   _   || | |   ||   | |       ||   _   |
|_______||_______||__| |__||_|  |__||___| |_______||__| |__|
`

export default {
  created() {
    if (process.browser) {
      console.info('Built by', beanAscii)
    }
  }
}

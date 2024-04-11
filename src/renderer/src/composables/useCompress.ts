import useConfigStroe from "@renderer/store/useConfigStroe"

export default () => {
    const {config} = useConfigStroe()
    const getCompressFile = () => {
        return config.files[0]
    }
    const compress = () => {
        const file = getCompressFile()
        window.api.compress({
          file: {...file},
          size: config.size,
          fps: config.frame
        })
      }

      return {compress}
}
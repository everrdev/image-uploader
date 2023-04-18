export default function GetFile() {
    let input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"

    input.click()

    return new Promise((resolve, reject) => {
        input.onchange = () => {
            resolve(input.files[0])
        }
    })
}
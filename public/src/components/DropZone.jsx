export default function DropZone({ onDrop }) {

    function onDropped(event) {
        event.preventDefault()
        event.stopPropagation()
        
        onDrop(event.dataTransfer.files)
    }

    function onDragOver(event) {
        event.stopPropagation()
        event.preventDefault()
    }

    return (
        <div className="dropzone" onDragOver={onDragOver} onDrop={onDropped}>
            <img src="/assets/image.svg" alt="" className="dropzone-decoration" />
            <p className="text-desc">Drag & Drop your image here</p>
        </div>
    );
}
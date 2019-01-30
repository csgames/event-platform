export namespace FileUtils {
    export function downloadFile(fileName: string, content: Blob) {
        const url = window.URL.createObjectURL(content);
        const downloadLink = document.createElement("a");
        document.body.appendChild(downloadLink);
        downloadLink.style.display = "none";
        downloadLink.href = url;
        downloadLink.download = fileName;
        downloadLink.click();
        window.URL.revokeObjectURL(url);
    }

    export function downloaFromLink(link: string) {
        const downloadLink = document.createElement("a");
        document.body.appendChild(downloadLink);
        downloadLink.style.display = "none";
        downloadLink.href = link;
        downloadLink.click();
    }
}

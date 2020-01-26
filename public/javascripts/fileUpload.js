FilePond.registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginFileEncode
);

// FilePond.setOptions({
//   stylePanelAspectRatio: 1 / coverAspectRatio,
//   imageResizeTargetWidth: coverWidth,
//   imageResizeTargetHeight: coverHeight
// });

FilePond.parse(document.body);

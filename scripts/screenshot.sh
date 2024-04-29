grim -o $(hyprctl activeworkspace -j | jq -r .monitor) - \
    | satty --filename - --fullscreen --early-exit --copy-command 'wl-copy' --init-tool crop \
        --output-filename ~/Pictures/Screenshots/satty-$(date '+%Y%m%d-%H:%M:%S').png
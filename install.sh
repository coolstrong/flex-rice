# mv ~/.config/hypr/ ~/.config/hypr-old
# mv ~/.config/ags/ ~/.config/ags-old
# mv ~/.config/wofi/ ~/.config/wofi-old
# cp ~/.config/fish/config.fish ~/.config/fish/config.back.fish

# copy files

cp scripts *.conf ~/.config/hypr/
cp -r ./configs/ags ~/.config/ags
cp -r ./configs/wofi ~/.config/wofi

# set permissions for scripts
sudo chmod +x ~/.config/hypr/scripts/*
sudo chmod +x ~/.config/ags/scripts/*

# setup environment
sudo cp /etc/environment /etc/environmentOLD
echo 'QT_QPA_PLATFORMTHEME=qt5ct' | sudo tee -a /etc/environment

# copy theme files
mkdir ~/.local/share/color-schemes/
cp ./configs/ags/modules/theme/plasma-colors/* ~/.local/share/color-schemes/
cp ./configs/qt5ct.conf ~/.config/qt5ct/

mkdir ~/.fonts
cp -r ./configs/.fonts/* ~/.fonts

mkdir ~/.local/share/icons
tar -xzf ./configs/icons/BeautySolar.tar.gz -C ~/.local/share/icons
tar -xzf ./configs/icons/Delight-brown-dark.tar.gz -C ~/.local/share/icons
tar -xzf ./configs/icons/Gradient-Dark-Icons.tar.gz -C ~/.local/share/icons
tar -xzf ./configs/icons/Infinity-Dark-Icons.tar.gz -C ~/.local/share/icons
tar -xzf ./configs/icons/kora-grey-light-panel.tar.gz -C ~/.local/share/icons
tar -xzf ./configs/icons/Magma.tar.gz -C ~/.local/share/icons
tar -xzf ./configs/icons/NeonIcons.tar.gz -C ~/.local/share/icons
tar -xzf ./configs/icons/la-capitaine-icon-theme.tar.gz -C ~/.local/share/icons
tar -xzf ./configs/icons/oomox-aesthetic-dark.tar.gz -C ~/.local/share/icons
tar -xzf ./configs/icons/Vivid-Dark-Icons.tar.gz -C ~/.local/share/icons
tar -xzf ./configs/icons/Windows11-red-dark.tar.gz -C ~/.local/share/icons
tar -xzf ./configs/icons/Zafiro-Nord-Dark-Black.tar.gz -C ~/.local/share/icons

mkdir ~/.themes
tar -xzf ./configs/gtk-themes/Cabinet-Light-Orange.tar.gz -C ~/.themes
tar -xzf ./configs/gtk-themes/Kimi-dark.tar.gz -C ~/.themes
tar -xzf ./configs/gtk-themes/Nordic-darker-standard-buttons.tar.gz -C ~/.themes
tar -xzf ./configs/gtk-themes/Orchis-Green-Dark-Compact.tar.gz -C ~/.themes
tar -xzf ./configs/gtk-themes/Shades-of-purple.tar.xz -C ~/.themes
tar -xzf ./configs/gtk-themes/Tokyonight-Dark-BL.tar.gz -C ~/.themes
tar -xzf ./configs/gtk-themes/Dracula.tar.gz -C ~/.themes
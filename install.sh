
# copy files
cp *.conf ~/.config/hypr/
cp -r ./scripts ~/.config/hypr/scripts

cp ./configs/ags/dist/config.js ~/.config/ags/
cp -r ./configs/ags/assets ~/.config/ags/assets
cp -r ./configs/ags/scripts ~/.config/ags/scripts
cp -r ./configs/ags/scss ~/.config/ags/scss

cp -r ./configs/wofi ~/.config/wofi

# set permissions for scripts
sudo chmod +x ~/.config/hypr/scripts/*
sudo chmod +x ~/.config/ags/scripts/*

# setup environment
sudo cp /etc/environment /etc/environmentOLD
echo 'QT_QPA_PLATFORMTHEME=qt5ct' | sudo tee -a /etc/environment

# copy theme files
mkdir -p ~/.local/share/color-schemes/
cp ./configs/ags/modules/theme/plasma-colors/* ~/.local/share/color-schemes/
mkdir -p ~/.config/qt5ct/
cp ./configs/qt5ct.conf ~/.config/qt5ct/

mkdir ~/.fonts
cp -r ./configs/.fonts/* ~/.fonts

mkdir ~/.local/share/icons
tar -xf ./configs/icons/BeautySolar.tar.gz -C ~/.local/share/icons
tar -xf ./configs/icons/Delight-brown-dark.tar.gz -C ~/.local/share/icons
tar -xf ./configs/icons/Gradient-Dark-Icons.tar.gz -C ~/.local/share/icons
tar -xf ./configs/icons/Infinity-Dark-Icons.tar.gz -C ~/.local/share/icons
tar -xf ./configs/icons/kora-grey-light-panel.tar.gz -C ~/.local/share/icons
tar -xf ./configs/icons/Magma.tar.gz -C ~/.local/share/icons
tar -xf ./configs/icons/NeonIcons.tar.gz -C ~/.local/share/icons
tar -xf ./configs/icons/la-capitaine-icon-theme.tar.gz -C ~/.local/share/icons
tar -xf ./configs/icons/oomox-aesthetic-dark.tar.gz -C ~/.local/share/icons
tar -xf ./configs/icons/Vivid-Dark-Icons.tar.gz -C ~/.local/share/icons
tar -xf ./configs/icons/Windows11-red-dark.tar.gz -C ~/.local/share/icons
tar -xf ./configs/icons/Zafiro-Nord-Dark-Black.tar.gz -C ~/.local/share/icons

mkdir ~/.themes
tar -xf ./configs/gtk-themes/Cabinet-Light-Orange.tar.gz -C ~/.themes
tar -xf ./configs/gtk-themes/Kimi-dark.tar.gz -C ~/.themes
tar -xf ./configs/gtk-themes/Nordic-darker-standard-buttons.tar.gz -C ~/.themes
tar -xf ./configs/gtk-themes/Orchis-Green-Dark-Compact.tar.gz -C ~/.themes
tar -xf ./configs/gtk-themes/Shades-of-purple.tar.xz -C ~/.themes
tar -xf ./configs/gtk-themes/Tokyonight-Dark-BL.tar.gz -C ~/.themes
tar -xf ./configs/gtk-themes/Dracula.tar.gz -C ~/.themes
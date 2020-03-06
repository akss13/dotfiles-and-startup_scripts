#!/bin/bash
#This script aims to automate installation of various packages
function install_default() {
    if [ $(id -u) != 0 ]; then
        echo "Run the script as root"
    else
        #do stuff
        sudo apt update
        sudo add-apt-repository main
        sudo add-apt-repository universe
        sudo add-apt-repository restricted
        sudo add-apt-repository multiverse
        sudo apt update && sudo apt full-upgrade -y
        sudo apt install xpad lm-sensors git nautilus-admin gnome-tweak-tool htop neofetch seahorse-nautilus arc-theme tlp python3-pip python-pip build-essential audacious telegram-desktop unrar cmake xclip zsh powerline fonts-powerline clang-format nmap net-tools
    fi
}
function install_ppa() {
    if [ $(id -u) != 0 ]; then
        echo "Run the script as root"
    else
        sudo add-apt-repository ppa:numix/ppa -y
        sudo add-apt-repository ppa:linuxuprising/apps -y
        sudo add-apt-repository ppa:libreoffice/ppa -y
        sudo add-apt-repository ppa:mikhailnov/pulseeffects -y
        sudo add-apt-repository ppa:gnome-terminator -y
        sudo apt update
        sudo apt install numix-icon-theme-circle tlpui libreoffice command-not-found terminator
        sudo apt install pulseaudio pulseeffects --install-recommends
    fi
}
function install_repos() {
    git clone https://github.com/robbyrussell/oh-my-zsh.git ~/.oh-my-zsh
    cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
    chsh -s /bin/zsh
    git clone https://github.com/zsh-users/zsh-syntax-highlighting.git "$HOME/.zsh-syntax-highlighting" --depth 1
    echo "source $HOME/.zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" >>"$HOME/.zshrc"
    echo 'source /etc/zsh_command_not_found' >>~/.zshrc
}
install_default
install_ppa
install_repos

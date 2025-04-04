BrowserFS.install(window);

BrowserFS.configure({ fs: "IndexedDB", options: {} }, function (err) {
    if (err) {
        console.error("Error configuring BrowserFS:", err);
        return;
    }

    window.fs = BrowserFS.BFSRequire("fs");
    window.path = BrowserFS.BFSRequire("path");
    window.cwd = '/';

    function color(name, string) {
        var colors = {
            cyan: '#0ff',
            white: '#fff',
            green: '#0f0' 
        };
        return colors[name] ? `[[;${colors[name]};]${string}]` : string;
    }

    const commands = {
        "help": "[[;#0ff;]Available commands: ls, cd, pwd, cat, grep, ps, top, df, du, mkdir, rm, cp, mv, chmod, ping, ssh, man]",
        
        // File System
        "ls": "[[;#0ff;]bin  dev  etc  home  lib  proc  tmp  usr  var]",
        "ls -l": `
            [[;#0ff;]total 16
            drwxr-xr-x 2 user user 4096 Jan 10 10:00 bin
            drwxr-xr-x 4 user user 4096 Jan 10 10:01 home
            drwxr-xr-x 3 user user 4096 Jan 10 10:02 lib
            drwxrwxrwt 2 user user 4096 Jan 10 10:03 tmp]]`,
        "cd ~": "[[;#0ff;](Working directory changed to /home/user)]",
        "pwd": "[[;#0ff;]/home/user]]",
        "cat README.md": "[[;#0ff;]This is a simulated Linux terminal environment for demonstration purposes.]",
        
        // System Monitoring
        "ps": `
            [[;#0ff;]PID TTY          TIME CMD
            1234 pts/0    00:00:00 bash
            5678 pts/0    00:00:00 fake_term]]`,
        "top": `
            [[;#0ff;]top - 10:30:45 up 1 day,  2:30,  1 user,  load average: 0.15, 0.10, 0.05
            Tasks: 15 total,   1 running,  14 sleeping,   0 stopped,   0 zombie
            %Cpu(s):  2.3 us,  1.0 sy,  0.0 ni, 96.7 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
            KiB Mem :  2048000 total,   500000 free,   800000 used,   748000 buff/cache
            KiB Swap:  1048576 total,  1048576 free,        0 used.  1200000 avail Mem]]`,
        "df -h": `
            [[;#0ff;]Filesystem      Size  Used Avail Use% Mounted on
            /dev/sda1        20G   5G   15G  25% /
            tmpfs           1.0G     0  1.0G   0% /dev/shm]]`,
        "du -sh *": `
            [[;#0ff;]4.0K    bin
            8.0K    home
            12K     lib
            4.0K    tmp]]`,
        
        // Networking
        "ping -c 4 8.8.8.8": `
            [[;#0ff;]PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
            64 bytes from 8.8.8.8: icmp_seq=1 ttl=117 time=15.3 ms
            64 bytes from 8.8.8.8: icmp_seq=2 ttl=117 time=14.8 ms
            64 bytes from 8.8.8.8: icmp_seq=3 ttl=117 time=16.2 ms
            64 bytes from 8.8.8.8: icmp_seq=4 ttl=117 time=15.7 ms
            
            --- 8.8.8.8 ping statistics ---
            4 packets transmitted, 4 received, 0% packet loss, time 3005ms
            rtt min/avg/max/mdev = 14.8/15.5/16.2/0.5 ms]]`,
        "ssh user@localhost": "[[;#0ff;]user@localhost's password: [[;#fff;]_]]",
        
        // System Admin
        "chmod 755 script.sh": "[[;#0ff;](Permissions changed for script.sh)]",
        "mkdir new_dir": "[[;#0ff;](Directory 'new_dir' created)]",
        "rm old_file": "[[;#0ff;](File 'old_file' removed)]",
        "cp file1 file2": "[[;#0ff;](Copied file1 to file2)]",
        "mv old_name new_name": "[[;#0ff;](Renamed 'old_name' to 'new_name')]",
        
        // Documentation
        "man ls": "[[;#0ff;]LS(1) - list directory contents\n\nUsage: ls [OPTION]... [FILE]...\nOptions:\n  -l  use long listing format\n  -a  show hidden files]]",
    };

    var term = $('.term').terminal((command) => {
        if (commands[command]) {
            term.echo(commands[command], { typing: true, delay: 40 });
        } else {
            term.error(`[[;f00;]bash: ${command}: command not found]`);
        }
    }, {
        checkArity: false,
        greetings: '',
        prompt: function() {
            return [
                color('green', 'LuChristCho:$ '),
            ].join('');
        },
        onInit: function(term) {
            term.css('animation', 'crt-flicker 0.1s infinite alternate');
        }
    });

    function simulateTyping(commandsList) {
        let index = 0;
        function typeNext() {
            if (index < commandsList.length) {
                term.exec(commandsList[index], { typing: true, delay: 50 });
                index++;
                setTimeout(typeNext, 3500);
            }
        }
        setTimeout(typeNext, 2000);
    }

    simulateTyping([
    ]);
});
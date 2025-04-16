module.exports = function (RED) {
    function HailoSetupNode(config) {
        RED.nodes.createNode(this, config);
        const { exec } = require("child_process");
        const fs = require("fs");
        const path = require("path");
        const node = this;

        const homeDir = process.env.HOME || process.env.USERPROFILE;
        const targetDir = path.join(homeDir, "hailo_nodered_support");

        node.on("input", function (msg) {
            if (fs.existsSync(targetDir)) {
                node.send({ payload: "Folder already exists: hailo_nodered_support" });
                node.status({ fill: "green", shape: "dot", text: "Exists" });
                return;
            }

            const setupScript = `
                mkdir -p ${targetDir} &&
                cd ${targetDir} &&
                git clone https://github.com/KasunThushara/hailo_nodered.git . &&
                python3 -m venv --system-site-packages env &&
                source env/bin/activate &&
                pip install -r requirements.txt
            `;

            exec(setupScript, { shell: "/bin/bash" }, (error, stdout, stderr) => {
                if (error) {
                    node.error(`Setup failed: ${stderr}`);
                    return;
                }
                node.send({ payload: "Setup completed successfully" });
                node.status({ fill: "green", shape: "dot", text: "Setup done" });
            });

            node.status({ fill: "blue", shape: "ring", text: "Setting up..." });
        });
    }

    RED.nodes.registerType("hailo-setup", HailoSetupNode);
};

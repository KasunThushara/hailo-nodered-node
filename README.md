---

# 🚀 node-red-contrib-hailo-detect

Custom Node-RED nodes to interface with Hailo AI for object detection, pose estimation, and hand/face landmark detection on Raspberry Pi using the Hailo-8 accelerator.

---

## 🧰 Prerequisites

Before using these Node-RED nodes, please prepare your Raspberry Pi environment by following the official Seeed tutorial:

🔗 [Prepare Raspberry Pi for Hailo](https://seeed-projects.github.io/Tutorial-of-AI-Kit-with-Raspberry-Pi-From-Zero-to-Hero/docs/Chapter_2-Configuring_the_RaspberryPi_Environment/Introduction_to_Hailo_in_Raspberry_Pi_Environment#installing-hailo-software-on-raspberry-pi-5)

This includes:

- Setting up the Pi OS
- Installing Hailo drivers and SDK
- Verifying device connection (`hailortcli`)

---

## 📦 Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/KasunThushara/node-red-contrib-hailo-detect.git
```

---

### 2️⃣ Navigate to Node-RED User Directory

```bash
cd ~/.node-red
```

---

### 3️⃣ Install the Custom Nodes

Replace the path below with the actual path to your cloned repo:

```bash
npm install /full/path/to/node-red-contrib-hailo-detect
```

---

### 4️⃣ Restart Node-RED

If installed globally:

```bash
node-red-stop
node-red-start
```

Or using systemd:

```bash
sudo systemctl restart nodered.service
```

---

## 🧪 How to Use

### 1️⃣ Install Dependencies

Use the `hailo-setup` node to install required Python packages, set up the virtual environment, and prepare the server backend.

> 🔁 Run this **once** before using the other detection or landmark nodes.

---

### 2️⃣ Detect Objects

![Hailo Detection UI](assets/2.PNG)

Use the `hailo-detect` node.

- **Model (.hef) path**: Path to the Hailo model file
- **Label file**: Path to the `.txt` file containing class labels
- **Input source**:  
  - `"camera"` for live webcam input
  - Path to an `.mp4` video file

This node runs object detection and launches a Flask video stream.

---

### 3️⃣ Estimate Human Pose

Use the `hailo-pose` node.

- **Model (.hef) path**: Path to pose estimation Hailo model
- **Input source**:
  - `"camera"` for live webcam input
  - Path to a video file (`.mp4`)

---

### 4️⃣ Detect Face Landmarks (USB Camera Only)

Use the `hailo-face-landmark` node.

- **Important**: Only supports **live USB camera input**.
- Automatically launches live face detection and landmark localization.

No model path or label file is needed — the script is preconfigured for this task.

---

### 5️⃣ Detect Hand Landmarks (USB Camera Only)

Use the `hailo-hand-landmark` node.

- **Important**: Only supports **live USB camera input**.
- Detects hand keypoints and landmarks using a preconfigured model.

No model path or label file is needed.

---

### 6️⃣ View Live Stream in Node-RED Dashboard

Use a **`ui-template`** node and paste the following code (replace `your-pi-ip` with your Raspberry Pi's IP address):

```html
<div style="text-align: center;">
    <img src="http://your-pi-ip:5001/video_feed" style="width: 100%; max-width: 100%; height: auto; border: 2px solid #ccc; border-radius: 10px;" />
    
    <br><br>
    <button onclick="fetch('http://your-pi-ip:5001/stop')" style="padding: 10px 20px; font-size: 16px; background-color: #ff4444; color: white; border: none; border-radius: 5px; cursor: pointer;">
        Stop
    </button>
</div>
```

✅ This will display the live video stream and allow you to manually stop detection.

---

## 📁 Node List

| Node Name               | Description                                      |
|--------------------------|--------------------------------------------------|
| `hailo-setup`            | Install required dependencies and setup environment |
| `hailo-detect`           | Run object detection from camera or video file   |
| `hailo-pose`             | Perform human pose estimation                   |
| `hailo-face-landmark`    | Detect face landmarks (USB camera only)          |
| `hailo-hand-landmark`    | Detect hand landmarks (USB camera only)          |

---

## ⚠️ Notes

- **Face landmark** and **Hand landmark** nodes **only work with USB cameras**.  
  They do not support video file input at the moment.
- Make sure your Raspberry Pi detects your USB camera properly (`/dev/video0`).
- Flask server is exposed on **port 5001**. Ensure it’s not blocked by a firewall.

---

## 📜 License

This project is licensed under the MIT License.

---

# 🎯 Quick Summary

| Feature                | Input Source        | Special Notes                    |
|-------------------------|----------------------|-----------------------------------|
| Object Detection        | Camera / Video File   | Needs model (.hef) and labels     |
| Pose Estimation         | Camera / Video File   | Needs model (.hef)                |
| Face Landmarks          | USB Camera only       | Preconfigured model, live only   |
| Hand Landmarks          | USB Camera only       | Preconfigured model, live only   |

---

✅ This new README covers:
- your old features ✅
- hand/face landmark new features ✅
- USB camera restriction clearly ✅
- a clean and professional layout ✅

---

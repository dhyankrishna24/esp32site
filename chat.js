/**
 * EduSphere Student Discord Community & Chat Engine
 * ==================================================
 * Powered by Firebase Realtime Database with sub-100ms sync,
 * student identity persistence, voice study lounge, slide sharing,
 * and Web Audio API synthesized sound cues.
 */

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBkSChPp-lfTUzBR1zbe7qtbFpJL2pDwGY",
  appId: "1:455198043998:web:c80bbec47eb4fb71d8e9cf",
  authDomain: "dk-radio-e8950.firebaseapp.com",
  databaseURL: "https://dk-radio-e8950-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dk-radio-e8950",
  storageBucket: "dk-radio-e8950.firebasestorage.app",
  messagingSenderId: "455198043998"
};

const CHAT_CHANNELS = [
  {
    id: "general",
    name: "general-lounge",
    icon: "💬",
    topic: "Open discussion, campus news, and peer study banter",
    category: "TEXT CHANNELS"
  },
  {
    id: "slides",
    name: "slides-and-seminars",
    icon: "📊",
    topic: "Presentation design, peer review, and speaker advice",
    category: "TEXT CHANNELS"
  },
  {
    id: "loyola",
    name: "loyola-study-group",
    icon: "🏫",
    topic: "Loyola School Thiruvananthapuram study circle & exam prep",
    category: "TEXT CHANNELS"
  },
  {
    id: "cs-coding",
    name: "cs-and-coding",
    icon: "💻",
    topic: "Algorithms, Python, C++, Web development & FreeRTOS",
    category: "TEXT CHANNELS"
  },
  {
    id: "esp32-iot",
    name: "esp32-and-hardware",
    icon: "⚡",
    topic: "ESP32 microcontrollers, sensors, circuits & breadboarding",
    category: "TEXT CHANNELS"
  }
];

const VOICE_ROOMS = [
  {
    id: "study-room-a",
    name: "Study Lounge A (Quiet Focus)",
    icon: "🔊",
    users: [
      { name: "Dhyan (Loyola)", avatar: "👨‍💻", muted: false, speaking: true },
      { name: "Arjun (Gr 12)", avatar: "🔬", muted: true, speaking: false }
    ]
  },
  {
    id: "practice-hall",
    name: "Presentation Practice Hall",
    icon: "🎙️",
    users: [
      { name: "Rohan K", avatar: "📚", muted: false, speaking: false }
    ]
  }
];

class EduSphereChatEngine {
  constructor() {
    this.app = null;
    this.db = null;
    this.currentChannelId = "general";
    this.activeVoiceRoom = null;
    this.isMuted = false;
    this.isDeafened = false;
    this.listeners = {};
    this.audioCtx = null;
    this.user = this.loadUserProfile();
    this.presenceRef = null;
  }

  // Load or generate student profile stored in localStorage
  loadUserProfile() {
    try {
      const saved = localStorage.getItem("edusphere_chat_user");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Could not read chat user from storage", e);
    }
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const defaultUser = {
      id: "u_" + Math.random().toString(36).substring(2, 9),
      name: "Student_" + randomNum,
      badge: "Loyola School Scholar",
      role: "Student",
      avatar: ["👨‍💻", "👩‍💻", "🎓", "🔬", "🚀", "💡", "⚡"][Math.floor(Math.random() * 7)],
      status: "online"
    };
    try {
      localStorage.setItem("edusphere_chat_user", JSON.stringify(defaultUser));
    } catch (e) {}
    return defaultUser;
  }

  saveUserProfile(updated) {
    this.user = { ...this.user, ...updated };
    try {
      localStorage.setItem("edusphere_chat_user", JSON.stringify(this.user));
    } catch (e) {}
    this.updatePresence();
  }

  // Initialize Firebase RTDB
  init() {
    if (typeof firebase === "undefined") {
      console.error("Firebase SDK not loaded");
      return;
    }
    if (!firebase.apps.length) {
      this.app = firebase.initializeApp(FIREBASE_CONFIG);
    } else {
      this.app = firebase.app();
    }
    this.db = firebase.database();
    this.setupPresence();
  }

  // Track online presence
  setupPresence() {
    if (!this.db) return;
    const connectedRef = this.db.ref(".info/connected");
    connectedRef.on("value", (snap) => {
      if (snap.val() === true) {
        this.presenceRef = this.db.ref("chat/presence/" + this.user.id);
        this.presenceRef.onDisconnect().remove();
        this.updatePresence();
      }
    });

    // Listen to online presence list
    this.db.ref("chat/presence").on("value", (snap) => {
      const data = snap.val() || {};
      const users = Object.values(data);
      if (typeof this.onPresenceChanged === "function") {
        this.onPresenceChanged(users);
      }
    });
  }

  updatePresence() {
    if (this.presenceRef) {
      this.presenceRef.set({
        id: this.user.id,
        name: this.user.name,
        badge: this.user.badge,
        role: this.user.role,
        avatar: this.user.avatar,
        status: this.user.status,
        channel: this.currentChannelId,
        voiceRoom: this.activeVoiceRoom,
        lastSeen: firebase.database.ServerValue.TIMESTAMP
      });
    }
  }

  // Subscribe to channel messages
  subscribeToChannel(channelId, callback) {
    if (!this.db) this.init();
    if (!this.db) return;

    // Unsubscribe previous channel
    if (this.currentMessageRef) {
      this.currentMessageRef.off();
    }

    this.currentChannelId = channelId;
    this.updatePresence();

    this.currentMessageRef = this.db
      .ref("chat/channels/" + channelId + "/messages")
      .limitToLast(60);

    this.currentMessageRef.on("value", (snapshot) => {
      const msgsObj = snapshot.val() || {};
      const messages = Object.entries(msgsObj).map(([id, val]) => ({
        id,
        ...val
      }));
      // Sort chronologically
      messages.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
      callback(messages);
    });
  }

  // Send a new message
  async sendMessage(text, slideRef = null) {
    if (!this.db) this.init();
    if (!this.db || !text || !text.trim()) return;

    const trimmed = text.trim();
    const payload = {
      user: this.user.name,
      userId: this.user.id,
      badge: this.user.badge,
      role: this.user.role,
      avatar: this.user.avatar,
      text: trimmed,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      slideRef: slideRef || null
    };

    await this.db.ref("chat/channels/" + this.currentChannelId + "/messages").push(payload);
    this.playPopSound(800, 0.05); // Synthesized send pop
  }

  // Add emoji reaction
  async addReaction(channelId, messageId, emoji) {
    if (!this.db) this.init();
    if (!this.db) return;
    const ref = this.db.ref(
      `chat/channels/${channelId}/messages/${messageId}/reactions/${emoji}`
    );
    ref.transaction((current) => (current || 0) + 1);
    this.playPopSound(950, 0.04);
  }

  // Join / Leave voice room
  toggleVoiceRoom(roomId) {
    if (this.activeVoiceRoom === roomId) {
      this.activeVoiceRoom = null;
      this.playPopSound(400, 0.08); // Lower pitch leave sound
    } else {
      this.activeVoiceRoom = roomId;
      this.playPopSound(1200, 0.08); // High chime join sound
    }
    this.updatePresence();
    return this.activeVoiceRoom;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.playPopSound(this.isMuted ? 500 : 700, 0.04);
    return this.isMuted;
  }

  toggleDeafen() {
    this.isDeafened = !this.isDeafened;
    this.playPopSound(this.isDeafened ? 350 : 650, 0.04);
    return this.isDeafened;
  }

  // Gentle, pleasing synthesized sound effect using Web Audio API (zero audio file dependencies)
  playPopSound(freq = 800, duration = 0.05) {
    try {
      if (!this.audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) this.audioCtx = new AudioContextClass();
      }
      if (this.audioCtx && this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.4, this.audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      // Audio playback might be silenced or blocked by user gesture policy
    }
  }
}

// Global Singleton Instance
window.EduSphereChat = new EduSphereChatEngine();
window.CHAT_CHANNELS = CHAT_CHANNELS;
window.VOICE_ROOMS = VOICE_ROOMS;

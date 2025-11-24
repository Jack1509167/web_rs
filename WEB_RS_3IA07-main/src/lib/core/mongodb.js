import { ObjectId } from "mongodb";
import clientPromise from "../mongodb";

class MongodbRS {
  #db_name;
  #col_name;
  #userId;

  db_collection(col_name) {
    this.#db_name = "pemrograman_web";
    this.#col_name = col_name;
    return this;
  }

  async insertSchedule(data) {
    if (!this.#col_name) {
      console.error("⚠️Colletion belum diatur...");
      return null;
    }

    try {
      const client = await clientPromise;

      const db = client.db(this.#db_name);
      const col = db.collection("rs_janjiTemu");
      const dataLen = (await col.find({}).toArray()).length;

      const docs = {
        noreg: `${data.doctor}${String(new Date().getDate()).padStart(2, "0")}${String(new Date().getMonth()).padStart(2, "0")}${new Date().getFullYear()}${dataLen + 1}`,
        name: data.name,
        email: data.email,
        hp: data.phone,
        date: new Date(`${data.date}T00:00:00`).toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
        createAt: new Date().toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
        spesialist: data.spesialist,
        doctor: data.doctor,
        complaint: data.complaint,
        status: "incoming",
      };
      //   console.log(docs);

      const result = await col.insertOne(docs);
      this.#userId = result.insertedId;
      return this.#userId;
    } catch (e) {
      console.error(e);
    }
  }

  async readSchedule(noreg = "") {
    if (!this.#col_name) {
      console.error("⚠️Colletion belum diatur...");
      return null;
    }

    try {
      const client = await clientPromise;

      const db = client.db(this.#db_name);
      const col = db.collection(this.#col_name);

      const result = await col.findOne({ noreg: noreg });
      // console.log(result);
      return result;
    } catch (e) {
      console.error(e);
    }
  }
  async readScheduleByID(id = "") {
    if (!this.#col_name) {
      console.error("⚠️Colletion belum diatur...");
      return null;
    }

    try {
      const client = await clientPromise;

      const db = client.db(this.#db_name);
      const col = db.collection(this.#col_name);

      const result = await col.findOne({ _id: new ObjectId(id) });
      // console.log(result);
      return result;
    } catch (e) {
      console.error(e);
    }
  }

  async readMetadata(key = "") {
    if (!this.#col_name) {
      console.error("⚠️Colletion belum diatur...");
      return null;
    }

    try {
      const client = await clientPromise;

      const db = client.db(this.#db_name);
      const col = db.collection(this.#col_name);

      const result = await col.findOne({ key: key });
      // console.log(result.value);

      return result.value;
    } catch (e) {
      console.error(e);
    }
  }

  async dataAll() {
    if (!this.#col_name) {
      console.error("⚠️Colletion belum diatur...");
      return null;
    }

    try {
      const client = await clientPromise;

      const db = client.db(this.#db_name);
      const col = db.collection(this.#col_name);

      const result = await col.find({}).toArray();
      // console.log(result);

      return result;
    } catch (e) {
      console.error(e);
    }
  }

  async readDoctor(code) {
    if (!this.#col_name) {
      console.error("⚠️Colletion belum diatur...");
      return null;
    }

    try {
      const client = await clientPromise;

      const db = client.db(this.#db_name);
      const col = db.collection(this.#col_name);

      const result = await col.findOne({ code: code });
      // console.log(result);

      return result;
    } catch (e) {
      console.error(e);
    }
  }

  async checkAccount(username) {
    if (!this.#col_name) {
      console.error("⚠️Colletion belum diatur...");
      return null;
    }

    try {
      const client = await clientPromise;

      const db = client.db(this.#db_name);
      const col = db.collection(this.#col_name);

      const result = await col.findOne({ username: username });
      // console.log(result.value);

      return result;
    } catch (e) {
      console.error(e);
    }
  }

  async updateSchedule(data) {
    if (!this.#col_name) {
      console.error("⚠️Colletion belum diatur...");
      return null;
    }

    try {
      const client = await clientPromise;

      const db = client.db(this.#db_name);
      const col = db.collection(this.#col_name);

      data.date = new Date(`${data.date}T00:00:00`).toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

      const result = await col.updateOne({ noreg: data.noreg }, { $set: data });
      // console.log(result);
      return result;
    } catch (e) {
      console.error(e);
    }
  }

  async deleteSchedule(noreg) {
    if (!this.#col_name) {
      console.error("⚠️Colletion belum diatur...");
      return null;
    }

    try {
      const client = await clientPromise;

      const db = client.db(this.#db_name);
      const col = db.collection(this.#col_name);

      const result = await col.deleteOne({ noreg: noreg });
      // console.log(result);
      return result;
    } catch (e) {
      console.error(e);
    }
  }
}

export default MongodbRS;

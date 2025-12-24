import { IndexType, Permission} from "node-appwrite"
import {db,questionCollection } from "../name"
import { databases } from "./config"

export default async function createQuestionCollection() {
  // 1. Create Collection
  await databases.createCollection(db, questionCollection, questionCollection, [
    Permission.read("any"),
    Permission.create("users"),
    Permission.update("users"),
    Permission.delete("users"),
  ]); 
  console.log("✅ Collection created");

  // 2. Create Attributes
  await Promise.all([
    databases.createStringAttribute(db, questionCollection, "title", 100, true),
    databases.createStringAttribute(
      db,
      questionCollection,
      "content",
      10000,
      true
    ),
    databases.createStringAttribute(
      db,
      questionCollection,
      "authorId",
      50,
      true
    ),
    databases.createStringAttribute(
      db,
      questionCollection,
      "tags",
      50,
      true,
      undefined,
      true
    ),
    databases.createStringAttribute(
      db,
      questionCollection,
      "attachmentId",
      50,
      false
    ),
  ]);
  console.log("✅ Attributes created");

  // 3. WAIT! Appwrite needs a moment to finalize attributes before indexing
  console.log("Waiting for attributes to settle...");
  await new Promise((resolve) => setTimeout(resolve, 5000)); // 5-second wait

  // 4. Create Indexes
  // create indexes
  await Promise.all([
    // 1. Fulltext for Title Search
    databases.createIndex(db, questionCollection, "title", IndexType.Fulltext, [
      "title",
    ]),
    // 2. Fulltext for Content Search
    databases.createIndex(
      db,
      questionCollection,
      "content",
      IndexType.Fulltext,
      ["content"]
    ),
  ]);
  console.log("✅ Indexes created");
}
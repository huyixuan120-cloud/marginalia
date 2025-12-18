"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import { CommentNode } from "./CommentNode";

export interface Comment {
  id: string;
  content: string;
  user_id: string;
  user_email: string;
  article_slug: string;
  parent_id: string | null;
  created_at: string;
  is_deleted: boolean;
  children?: Comment[];
}

interface CommentSectionProps {
  slug: string;
}

// Build tree structure from flat array
function buildCommentTree(comments: Comment[]): Comment[] {
  const commentMap = new Map<string, Comment>();
  const rootComments: Comment[] = [];

  // First pass: create map and initialize children arrays
  comments.forEach((comment) => {
    commentMap.set(comment.id, { ...comment, children: [] });
  });

  // Second pass: build tree
  comments.forEach((comment) => {
    const node = commentMap.get(comment.id)!;
    if (comment.parent_id === null) {
      rootComments.push(node);
    } else {
      const parent = commentMap.get(comment.parent_id);
      if (parent) {
        parent.children!.push(node);
      } else {
        // Orphaned comment (parent doesn't exist), treat as root
        rootComments.push(node);
      }
    }
  });

  return rootComments;
}

export function CommentSection({ slug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
    checkUser();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [slug]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const fetchComments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("article_slug", slug)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching comments:", error);
    } else {
      setComments(data || []);
    }
    setLoading(false);
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    setSubmitting(true);
    const { error } = await supabase.from("comments").insert({
      content: newComment.trim(),
      user_id: user.id,
      user_email: user.email!,
      article_slug: slug,
      parent_id: null,
    });

    if (error) {
      console.error("Error posting comment:", error);
      alert("Failed to post comment. Please try again.");
    } else {
      setNewComment("");
      fetchComments(); // Refresh comments
    }
    setSubmitting(false);
  };

  const commentTree = buildCommentTree(comments);

  return (
    <section className="mx-auto mt-24 max-w-3xl px-6 pb-16">
      {/* Section Header */}
      <div className="mb-8 border-t border-stone-200 pt-8">
        <h2 className="font-serif text-3xl font-bold text-stone-900">
          Discussion ({comments.length})
        </h2>
        <p className="mt-2 font-sans text-sm text-stone-600">
          {user ? "Join the conversation" : "Sign in to participate in the discussion"}
        </p>
      </div>

      {/* New Comment Form (only for logged-in users) */}
      {user && (
        <form onSubmit={handleSubmitComment} className="mb-12">
          <div className="rounded-lg border border-stone-200 bg-white p-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              disabled={submitting}
              rows={4}
              className="w-full resize-none border-none bg-transparent font-sans text-stone-900 placeholder-stone-400 focus:outline-none disabled:opacity-50"
            />
            <div className="mt-3 flex justify-end gap-2 border-t border-stone-100 pt-3">
              <button
                type="button"
                onClick={() => setNewComment("")}
                disabled={submitting || !newComment}
                className="px-4 py-2 font-sans text-sm text-stone-600 hover:text-stone-900 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || !newComment.trim()}
                className="bg-stone-900 px-6 py-2 font-sans text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-stone-700 disabled:opacity-50"
              >
                {submitting ? "Posting..." : "Comment"}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Comments List */}
      {loading ? (
        <div className="py-8 text-center">
          <p className="font-sans text-stone-500">Loading comments...</p>
        </div>
      ) : commentTree.length === 0 ? (
        <div className="rounded-lg border border-stone-200 bg-stone-50 p-8 text-center">
          <p className="font-sans text-stone-600">
            No comments yet. {user ? "Be the first to share your thoughts!" : "Sign in to start the discussion."}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {commentTree.map((comment) => (
            <CommentNode
              key={comment.id}
              comment={comment}
              depth={0}
              isUserLoggedIn={!!user}
              currentUserId={user?.id || null}
              articleSlug={slug}
              onCommentAdded={fetchComments}
            />
          ))}
        </div>
      )}
    </section>
  );
}

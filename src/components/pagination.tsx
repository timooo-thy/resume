"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";

type PaginationProps = {
  currentPage: number;
  totalPosts: number;
  postsPerPage: number;
};
export default function Pagination({
  currentPage,
  postsPerPage,
  totalPosts,
}: PaginationProps) {
  const router = useRouter();

  const [page, setPage] = useState(currentPage);
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`/blog?page=${newPage}`);
  };

  return (
    <div className="flex justify-center items-center space-x-4">
      <Button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        variant="outline"
      >
        Previous
      </Button>
      <span className="text-muted-foreground">
        Page {page} of {totalPages}
      </span>
      <Button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        variant="outline"
      >
        Next
      </Button>
    </div>
  );
}

package com.spendsenseai.repository;

import com.spendsenseai.entity.Income;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IncomeRepository extends JpaRepository<Income, Long> {

    List<Income> findByUserIdOrderByIncomeDateDesc(Long userId);

    List<Income> findByUserIdAndTitleContainingIgnoreCaseOrderByIncomeDateDesc(Long userId, String title);

    List<Income> findByUserIdAndIncomeDateBetweenOrderByIncomeDateDesc(Long userId, LocalDate startDate, LocalDate endDate);

    @Query("SELECT COALESCE(SUM(i.amount), 0.0) FROM Income i WHERE i.user.id = :userId")
    Double sumAmountByUserId(@Param("userId") Long userId);

    @Query("SELECT COALESCE(SUM(i.amount), 0.0) FROM Income i WHERE i.user.id = :userId AND i.incomeDate BETWEEN :startDate AND :endDate")
    Double sumAmountByUserIdAndIncomeDateBetween(@Param("userId") Long userId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}

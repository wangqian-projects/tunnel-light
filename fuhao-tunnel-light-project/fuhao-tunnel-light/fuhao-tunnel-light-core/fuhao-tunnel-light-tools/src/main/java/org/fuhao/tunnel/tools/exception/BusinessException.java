package org.fuhao.tunnel.tools.exception;

/**
 * 业务异常
 *
 * @author 付豪
 * @date 2019-11-06
 */
public class BusinessException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public BusinessException() {
        super();
    }

    public BusinessException(String message) {
        super(message);
    }
}
